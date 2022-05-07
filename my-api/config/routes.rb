Rails.application.routes.draw do

  mount ActionCable.server, at: '/cable'

  scope path: ApplicationResource.endpoint_namespace, defaults: { format: :jsonapi } do

    # guides resources
    get 'guides' => 'guides#index'
    get 'guides/:id' => 'guides#show'
    post 'guides' => 'guides#update'

    # locations resources
    get 'locations' => 'locations#index'
    get 'locations/:id' => 'locations#show'

    # sessions resources
    post 'sessions' => 'sessions#create'
    get 'sessions' => 'sessions#show'
    delete 'sessions' => 'sessions#destroy'

  end
end
