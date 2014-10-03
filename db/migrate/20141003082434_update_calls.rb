class UpdateCalls < ActiveRecord::Migration
  def change
    add_column :calls, :subject, :string
    rename_column :calls, :score, :total_score
    add_column :calls, :file_id, :integer
    add_column :calls, :comment, :string
  end
end
