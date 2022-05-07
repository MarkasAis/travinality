class RegistrationsController < ApplicationController
  def register
    guide = Guide.create!(
      email: params['guide']['email'],
      password: params['guide']['password'],
      password_confirmation: params['guide']['password']
    )

    if guide
      session[:guide_id] = guide.id
      render json: {
        status: :created,
        guide: guide
      }
    else
      render json: { status: 500 }
    end
  end
end
