class GuideResource < ApplicationResource
  include Rails.application.routes.url_helpers

  primary_endpoint '/guides', [ :index, :show, :create, :update, :destory ]
	secondary_endpoint '/sessions', [ :create, :show, :delete ]

  attribute :name, :string
  attribute :origin, :string
  attribute :description, :string
  attribute :phone, :string
  attribute :email, :string
  attribute :cur_latitude, :float
  attribute :cur_longitude, :float
  attribute :cur_country, :string
  attribute :cur_loc_name, :string
  attribute :active, :boolean do
    if @object.active && (DateTime.now.to_i - @object.updated_at.to_i) > 6000
      @object.active = false

      LineChannel.broadcast_to('line_channel', {
        data: {
          id: @object.id,
          updates: {
            guide: {
              active: false
            }
          }
        }
      })
    end

    @object.active
  end

  attribute :picture, :string do
    @object.picture.service_url
  end

  has_many :locations

  attribute :created_at, :datetime, writable: false
  attribute :updated_at, :datetime, writable: false
end
