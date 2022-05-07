class LocationsController < ApplicationController
  def index
    locations = LocationResource.all(params)
    respond_with(locations)
  end

  def show
    location = LocationResource.find(params)
    respond_with(location)
  end

  def create
    location = LocationResource.build(params)

    if location.save
      render jsonapi: location, status: 201
    else
      render jsonapi_errors: location
    end
  end

  def update
    location = LocationResource.find(params)

    if location.update_attributes
      render jsonapi: location
    else
      render jsonapi_errors: location
    end
  end

  def destroy
    location = LocationResource.find(params)

    if location.destroy
      render jsonapi: { meta: {} }, status: 200
    else
      render jsonapi_errors: location
    end
  end
end
