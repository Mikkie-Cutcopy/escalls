class CreateVersions < ActiveRecord::Migration
  def change
    create_table :versions do |t|
      t.integer   :value
      t.timestamps
    end

    add_column :calls, :version, :integer
  end
end
