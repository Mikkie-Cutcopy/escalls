class ChangeDataColumnType < ActiveRecord::Migration
  def change
    change_column :reports, :data, :text
  end
end
