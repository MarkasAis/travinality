class CreateLocations < ActiveRecord::Migration[5.2]
  def change
    create_table :locations do |t|
      t.integer :guide_id
      t.float :latitude
      t.float :longitude
      t.string :country
      t.string :name

      t.timestamps
    end
  end
end
