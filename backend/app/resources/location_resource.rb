class LocationResource < ApplicationResource
  attribute :guide_id, :integer
  attribute :latitude, :float
  attribute :longitude, :float
  attribute :country, :string
  attribute :name, :string

  attribute :date, :string do
    @object.created_at.to_date.to_s
  end

  attribute :created_at, :datetime, writable: false
  attribute :updated_at, :datetime, writable: false
end
