class AddColumnToEstamstes < ActiveRecord::Migration
  def change

    add_column :estimates, :comment, :text
  end
end
