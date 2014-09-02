class CreateCriterions < ActiveRecord::Migration
  def change
    create_table :criterions do |t|
      t.string       :name
      t.string       :desc_fine
      t.string       :desc_bad
      t.integer      :score
      t.timestamps
    end
  end
end
