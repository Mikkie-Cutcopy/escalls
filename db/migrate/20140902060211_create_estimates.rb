class CreateEstimates < ActiveRecord::Migration
  def change
    create_table :estimates do |t|
      t.integer     :call_id
      t.integer     :criterion_id
      t.integer     :score
      t.timestamps
    end
  end
end
