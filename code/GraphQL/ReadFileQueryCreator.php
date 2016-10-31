<?php
namespace SilverStripe\AssetAdmin\GraphQL;

use SilverStripe\Assets\File;
use SilverStripe\Assets\Folder;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\UnionType;
use SilverStripe\GraphQL\QueryCreator;
use SilverStripe\ORM\Versioning\Versioned;

class ReadFileQueryCreator extends QueryCreator {

    public function attributes()
    {
        return [
            'name' => 'readFiles'
        ];
    }

    public function type()
    {
        return function() {
            return Type::listOf($this->manager->getType('FileInterface'));
        };
    }

    public function args() {
        return [
            'id' => [
                'type' => Type::id(),
            ],
            'parentId' => [
                'type' => Type::id(),
            ],
        ];
    }

    public function resolve($object, array $args, $context, $info)
    {
        $list = Versioned::get_by_stage(File::class, 'Stage');

        if(isset($args['parentId'])) {
            $list = $list->filter('ParentID', $args['parentId']);
        }

        if(isset($args['id']) && (int)$args['id'] > 0) {
            $list = $list->filter('ID', $args['id']);
        } else if(isset($args['id']) && (int)$args['id'] === 0) {
            // Special case for root folder
            $list = [new Folder([
                'ID' => 0,
            ])];
        }

        if($list instanceof DataList) {
            $list = $list->filterByCallback(function($file) { return $file->canView();});
        }

        return $list;
    }
}
