class CreateReports < ActiveRecord::Migration
  def change
    create_table :reports do |t|
      t.integer :call_id
      t.string  :data
      t.timestamps
    end
  end
end
