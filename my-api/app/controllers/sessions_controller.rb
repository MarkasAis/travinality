class SessionsController < ApplicationController
  include CurrentGuideConcern

  def create
    guide_resource = GuideResource
                .find(email: params["data"]["attributes"]["email"])

    guide = guide_resource.data
                .try(:authenticate, params["data"]["attributes"]["password"])

    if guide
      session[:guide_id] = guide.id
      update_active(guide, true)

      render json: { logged_in: true }, status: 200
    else
      render json: { logged_in: false }, status: 401
    end
  end

  def show
    if @current_guide
      params['filter'] = ActionController::Parameters.new(id: @current_guide.id)

      guide = GuideResource.find(params)
      render jsonapi: guide, status: 200
    else
      render jsonapi_errors: guide, status: 404
    end
  end

  def destroy
    update_active(@current_guide, false)
    reset_session
    render json: { logged_in: false }, status: 200
  end

  def update_active (guide, active)
    guide.active = active
    guide.save

    LineChannel.broadcast_to('line_channel', {
      data: {
        id: guide.id,
        updates: {
          guide: {
            active: active
          }
        }
      }
    })
  end
end
