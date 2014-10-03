class UpdateCriterions < ActiveRecord::Migration
  def change
    rename_column :criterions, :desc_fine, :good_thing
    rename_column :criterions, :desc_bad,  :bad_thing
    rename_column :criterions, :score,     :relative_weight
  end
end
