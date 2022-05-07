module CurrentGuideConcern
  extend ActiveSupport::Concern

  included do
    before_action :set_current_guide
  end

  def set_current_guide
    puts '.................'
    puts session[:guide_id]
    puts '.................'

    if session[:guide_id]
      @current_guide = Guide.find(session[:guide_id])
    end
  end
end
