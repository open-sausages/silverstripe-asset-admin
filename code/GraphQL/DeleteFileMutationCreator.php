<?php
namespace SilverStripe\AssetAdmin\GraphQL;

use SilverStripe\Assets\File;
use GraphQL\Type\Definition\Type;
use Chillu\GraphQL\MutationCreator;
use SilverStripe\ORM\Versioning\Versioned;
use Chillu\GraphQL\Util\CaseInsensitiveFieldAccessor;
use Chillu\GraphQL\Manager;

/**
 * Handles create and update
 */
class DeleteFileMutationCreator extends MutationCreator {

    public function attributes()
    {
        return [
            'name' => 'deleteFile'
        ];
    }

    public function type()
    {
        return Type::id();
    }

    public function args()
    {
        return [
            'id' => [
                'type' => Type::nonNull(Type::id()),
            ],
        ];
    }

    public function resolve($object, array $args, $context, $info)
    {
        $list = Versioned::get_by_stage(File::class, 'Stage');
        $file = $list->find('ID', $args['id']);

        if(!$file) {
            throw new \InvalidArgumentException(sprintf(
                '%s#%s not found', File::class, $args['id']
            ));
        }

//        if(!$file->canDelete()) {
//            throw new \InvalidArgumentException(sprintf(
//                '%s#%s delete not allowed', File::class, $args['id']
//            ));
//        }

        $file->deleteFromStage('Stage');
        $file->deleteFromStage('Live');

        return $args['id'];
    }
}
