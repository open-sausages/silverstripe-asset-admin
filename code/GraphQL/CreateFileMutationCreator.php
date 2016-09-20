<?php
namespace SilverStripe\AssetAdmin\GraphQL;

use GraphQL\Type\Definition\UnionType;
use SilverStripe\Assets\File;
use SilverStripe\Assets\Folder;
use GraphQL\Type\Definition\Type;
use Chillu\GraphQL\MutationCreator;
use SilverStripe\ORM\Versioning\Versioned;
use Chillu\GraphQL\Util\CaseInsensitiveFieldAccessor;
use Chillu\GraphQL\Manager;


class CreateFileMutationCreator extends MutationCreator {

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
            'name' => 'createFile',
            'description' => 'Creates files and images'
        ];
    }

    public function type()
    {
        return function() {
            return $this->manager->getType('FileInterface');
        };
    }

    public function args() {
        return [
            'file' => [
                'type' => function() {
                    return $this->manager->getType('FileInput');
                }
            ],
        ];
    }

    public function resolve($object, array $args, $context, $info)
    {
        $parent = Versioned::get_one_by_stage(Folder::class, 'Stage', $args['file']['parentId']);

        if(!$parent) {
            throw new \InvalidArgumentException(sprintf(
                '%s#%s not found',
                File::class,
                $args['parentId']
            ));
        }

        $file = File::create();
        foreach($args['file'] as $name => $val) {
            $this->accessor->setValue($file, $name, $val);
        }

//        if(!$file->canCreate()) {
//            throw new \InvalidArgumentException(sprintf(
//                '%s#%s create not allowed', File::class, $args['id']
//            ));
//        }

        $file->writeToStage('Stage');

        return $file;
    }
}
