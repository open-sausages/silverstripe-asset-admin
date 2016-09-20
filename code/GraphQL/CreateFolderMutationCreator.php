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


class CreateFolderMutationCreator extends MutationCreator {

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
            'name' => 'createFolder',
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
            'folder' => [
                'type' => function() {
                    return $this->manager->getType('FolderInput');
                }
            ],
        ];
    }

    public function resolve($object, array $args, $context, $info)
    {
        if(isset($args['folder']['parentId']) && (int)$args['folder']['parentId'] > 0) {
            $parent = Versioned::get_one_by_stage(Folder::class, 'Stage', $args['folder']['parentId']);
            if(!$parent) {
                throw new \InvalidArgumentException(sprintf(
                    '%s#%s not found',
                    Folder::class,
                    $args['folder']['parentId']
                ));
            }
        }

        $folder = Folder::create();
        foreach($args['folder'] as $name => $val) {
            $this->accessor->setValue($folder, $name, $val);
        }

//        if(!$folder->canCreate()) {
//            throw new \InvalidArgumentException(sprintf(
//                '%s#%s create not allowed', Folder::class, $args['id']
//            ));
//        }

        $folder->writeToStage('Stage');

        return $folder;
    }
}
