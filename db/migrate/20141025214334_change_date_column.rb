class ChangeDateColumn < ActiveRecord::Migration
  def change
    change_column :calls, :date, :datetime
  end
end
