<?php

namespace SilverStripe\AssetAdmin\GraphQL;

use SilverStripe\GraphQL\Util\CaseInsensitiveFieldAccessor;
use GraphQL\Type\Definition\Type;
use SilverStripe\GraphQL\TypeCreator;
use SilverStripe\GraphQL\Manager;
use SilverStripe\Assets\File;
use SilverStripe\Assets\Folder;

class FileTypeCreator extends TypeCreator {

    /**
     * @var CaseInsensitiveFieldAccessor
     */
    protected $accessor;

    public function __construct(Manager $manager = null)
    {
        $this->accessor = new CaseInsensitiveFieldAccessor();

        parent::__construct($manager);
    }

    public function attributes()
    {
        return [
            'name' => 'File',
            'description' => 'Type for files and images',
            'isTypeOf' => function($obj) {
                return ($obj instanceof File && !($obj instanceof Folder));
            }
        ];
    }

    public function interfaces()
    {
        return function() {
           return [$this->manager->getType('FileInterface')];
        };
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
            'type' => [
                'type' => Type::string(),
            ],
            'category' => [
                'type' => Type::string(),
            ],
            'name' => [
                'type' => Type::string(),
            ],
            'filename' => [
                'type' => Type::string(),
            ],
            'extension' => [
                'type' => Type::string(),
            ],
            'size' => [
                'type' => Type::int(),
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

        ];
    }

    public function resolveTypeField($object, array $args, $context, $info)
    {
        return $object instanceof Folder ? 'folder' : $object->FileType;
    }

    public function resolveCategoryField($object, array $args, $context, $info)
    {
        return $object instanceof Folder ? 'folder' : $object->appCategory();
    }

    public function resolveUrlField($object, array $args, $context, $info)
    {
        return $object->AbsoluteURL;
    }

    public function resolveField($object, array $args, $context, $info)
    {
        return $this->accessor->getValue($object, $info->fieldName);
    }

}
