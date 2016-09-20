<?php

namespace SilverStripe\AssetAdmin\GraphQL;

use GraphQL\Type\Definition\Type;
use SilverStripe\Assets\File;
use SilverStripe\Assets\Folder;
use SilverStripe\ORM\Versioning\Versioned;

class FolderTypeCreator extends FileTypeCreator {

    public function attributes()
    {
        return [
            'name' => 'Folder',
            'description' => 'Type for folders',
            'isTypeOf' => function($obj) {
                return ($obj instanceof Folder);
            }
        ];
    }

    public function fields() {
        return [
            'id' => [
                'type' => Type::nonNull(Type::int()),
            ],
            'created' => [
                'type' => Type::string(),
            ],
            'lastEdited' => [
                'type' => Type::string(),
            ],
            'owner' => [
                'type' => Type::string(),
            ],
            'parentId' => [
                'type' => Type::int(),
            ],
            'title' => [
                'type' => Type::string(),
            ],
            'exists' => [
                'type' => Type::boolean(),
            ],
            'name' => [
                'type' => Type::string(),
            ],
            'filename' => [
                'type' => Type::string(),
            ],
            'url' => [
                'type' => Type::string(),
            ],
            'canView' => [
                'type' => Type::boolean(),
            ],
            'canEdit' => [
                'type' => Type::boolean(),
            ],
            'canDelete' => [
                'type' => Type::boolean(),
            ],
            'children' => [
                'type' => function() {
                    return Type::listOf($this->manager->getType('FileInterface'));
                },
            ],
            'parents' => [
                'type' => function() {
                    return Type::listOf($this->manager->getType('FileInterface'));
                },
            ],

        ];
    }

    public function resolveChildrenField($object, array $args, $context, $info)
    {
        $list = Versioned::get_by_stage(File::class, 'Stage');
        return $list->filter('ParentID', $object->ID);
    }

    public function resolveParentsField($object, array $args, $context, $info)
    {
        $parents = [];
        $next = $object->Parent();
        while($next && $next->exists()) {
            array_unshift($parents, $next);
            if($next->ParentID) {
                $next = $next->Parent();
            } else {
                break;
            }
        }

        return $parents;
    }

}
