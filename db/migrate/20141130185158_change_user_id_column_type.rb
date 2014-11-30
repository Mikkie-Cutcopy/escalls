class ChangeUserIdColumnType < ActiveRecord::Migration
  def change
    remove_column :calls, :user_id
    add_column :calls, :user_id, :integer
  end
end
