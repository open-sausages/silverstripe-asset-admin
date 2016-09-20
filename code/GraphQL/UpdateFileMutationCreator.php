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
class UpdateFileMutationCreator extends MutationCreator {

    /**
     * @var DataObjectLowerCamelResolver
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
            'name' => 'updateFile'
        ];
    }

    public function type()
    {
        return function() {
            return $this->manager->getType('File');
        };
    }

    public function args() {
        return [
            'id' => [
                'type' => Type::nonNull(Type::id()),
            ],
            'file' => [
                'type' => function() {
                    return $this->manager->getType('FileInput');
                }
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

//        if(!$file->canEdit()) {
//            throw new \InvalidArgumentException(sprintf(
//                '%s#%s update not allowed', File::class, $args['id']
//            ));
//        }

        // TODO Use input type (and don't allow setting ID)
        foreach($args['file'] as $name => $val) {
            $this->accessor->setValue($file, $name, $val);
        }
        $file->update($args);
        $file->writeToStage('Stage');

        return $file;
    }
}
