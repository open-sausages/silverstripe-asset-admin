<?php
namespace SilverStripe\AssetAdmin\GraphQL;

use SilverStripe\Assets\File;
use SilverStripe\Assets\Folder;
use SilverStripe\ORM\ArrayList;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\UnionType;
use SilverStripe\GraphQL\Pagination\PaginatedQueryCreator;
use SilverStripe\GraphQL\Pagination\Connection;
use SilverStripe\ORM\Versioning\Versioned;


class ReadFileQueryCreator extends PaginatedQueryCreator {

    public function attributes()
    {
        return [
            'name' => 'readFiles'
        ];
    }

    public function connection() {
        return Connection::create('readFiles')
            ->setConnectionType(function() {
                $unionType = new UnionType([
                    'name' => 'Result',
                    'types' => [
                        $this->manager->getType('File'),
                        $this->manager->getType('Folder')
                    ],
                    'resolveType' => function($object) {
                        if($object instanceof Folder) {
                            return $this->manager->getType('Folder');
                        }
                        if($object instanceof File) {
                            return $this->manager->getType('File');
                        }
                        return null;
                    }
                ]);
                return $unionType;
            })
            ->setArgs([
                'id' => [
                    'type' => Type::id(),
                ],
                'parentId' => [
                    'type' => Type::id(),
                ],
            ])
            ->setSortableFields(['ID', 'Title', 'Created', 'LastEdited'])
            ->setConnectionResolver(array($this, 'resolveConnection'));
    }

    public function resolveConnection($object, array $args, $context, $info)
    {
        $list = Versioned::get_by_stage(File::class, 'Stage');

        if(isset($args['parentId'])) {
            $list = $list->filter('ParentID', $args['parentId']);
        }

        if(isset($args['id']) && (int)$args['id'] > 0) {
            $list = $list->filter('ID', $args['id']);
        } else if(isset($args['id']) && (int)$args['id'] === 0) {
            // Special case for root folder
            $list = new ArrayList([new Folder([
                'ID' => 0,
            ])]);
        }

        if($list instanceof DataList) {
            $list = $list->filterByCallback(function($file) { return $file->canView();});
        }

        // TODO Sorting

        return $list;
    }
}
