class GuidesController < ApplicationController
  include CurrentGuideConcern

  def index
    guides = GuideResource.all(params)
    respond_with(guides)
  end

  def show
    guide = GuideResource.find(params)
    respond_with(guide)
  end

  def create
    guide = GuideResource.build(params)

    if guide.save
      render jsonapi: guide, status: 201
    else
      render jsonapi_errors: guide
    end
  end

  def update
    if @current_guide
      params['filter'] = ActionController::Parameters.new(id: @current_guide.id)

      guide = GuideResource.find(params)

      old_latitude = guide.data.cur_latitude
      old_longitude = guide.data.cur_longitude
      old_country = guide.data.cur_country
      old_loc_name = guide.data.cur_loc_name

      guide_updates = {}
      params["data"]["attributes"].each do |attrib|
        if guide.data[attrib[0]] != attrib[1]
          guide_updates[attrib[0]] = attrib[1]
        end
      end

      if guide.update_attributes
        render jsonapi: guide

        guide_updates["active"] = guide.data.active

        if guide.data.cur_loc_name != old_loc_name &&
           old_latitude && old_longitude &&
           old_country && old_loc_name

          location_updates = {
            guide_id: guide.data.id,
            latitude: old_latitude,
            longitude: old_longitude,
            country: old_country,
            name: old_loc_name
          }

          old_location = Location.create(location_updates)
          location_updates["date"] = old_location.created_at.to_date.to_s

          LineChannel.broadcast_to('line_channel', {
            data: {
              id: guide.data.id,
              updates: {
                guide: guide_updates,
                location: location_updates
              }
            }
          })
        elsif !guide_updates.empty?
          LineChannel.broadcast_to('line_channel', {
            data: {
              id: guide.data.id,
              updates: {
                guide: guide_updates
              }
            }
          })
        end
      else
        render jsonapi_errors: guide
      end
    else
      render jsonapi_errors: guide, status: 401
    end
  end

  # def destroy
  #   guide = GuideResource.find(params)
  #
  #   if guide.destroy
  #     render jsonapi: { meta: {} }, status: 200
  #   else
  #     render jsonapi_errors: guide
  #   end
  # end
end
