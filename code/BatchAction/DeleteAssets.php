<?php

namespace SilverStripe\AssetAdmin\BatchAction;

use SilverStripe\Admin\CMSBatchAction;
use SilverStripe\Core\Convert;
use SilverStripe\ORM\ListInterface;

/**
 * Delete multiple {@link Folder} records (and the associated filesystem nodes).
 * Usually used through the {@link AssetAdmin} interface.
 */
class DeleteAssets extends CMSBatchAction
{
    public function getActionTitle()
    {
        return _t(__CLASS__.'.TITLE', 'Delete folders');
    }

    public function run(ListInterface $records)
    {
        $status = array(
            'modified'=>array(),
            'deleted'=>array()
        );

        foreach ($records as $record) {
            $id = $record->ID;

            // Perform the action
            if ($record->canDelete()) {
                $record->delete();
            }

            $status['deleted'][$id] = array();

            $record->destroy();
            unset($record);
        }

        return Convert::raw2json($status);
    }
}
