class AddRecordToCalls < ActiveRecord::Migration
  def self.up
    add_attachment :calls, :record
  end

  def self.down
    remove_attachment :calls, :record
  end
end