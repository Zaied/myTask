<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WorkspaceTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('workspaces')->insert([
           [
               'workspace_title' => 'Our First Workspace'
           ] ,
            [
                'workspace_title' => 'Our Second Workspace'
            ]
        ]);
    }
}
