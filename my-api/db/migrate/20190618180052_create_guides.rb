class CreateGuides < ActiveRecord::Migration[5.2]
  def change
    create_table :guides do |t|
      t.string :email
      t.string :password_digest
      t.string :name
      t.string :origin
      t.string :description
      t.string :phone
      t.float :cur_latitude
      t.float :cur_longitude
      t.string :cur_country
      t.string :cur_loc_name
      t.boolean :active

      t.timestamps
    end
  end
end
