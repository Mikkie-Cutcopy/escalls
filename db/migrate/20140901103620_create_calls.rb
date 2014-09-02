class CreateCalls < ActiveRecord::Migration
  def change
    create_table :calls do |t|
      t.date       :date
      t.string     :user_id
      t.integer    :score
      t.string     :status
      t.timestamps
    end
  end
end
