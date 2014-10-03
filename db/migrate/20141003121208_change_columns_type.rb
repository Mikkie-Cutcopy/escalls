class ChangeColumnsType < ActiveRecord::Migration
  def change
    change_column :criterions, :bad_thing, :text
    change_column :criterions, :good_thing, :text
    change_column :calls, :comment, :text
    change_column :comments, :body, :text
  end
end
