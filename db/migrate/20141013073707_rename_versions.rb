class RenameVersions < ActiveRecord::Migration
  def change
    rename_table :versions, :criterion_versions
  end
end
