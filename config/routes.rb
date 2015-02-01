Rails.application.routes.draw do

  devise_for :users

  root to: 'start#access'
  get  '/404',  to:  'application#not_found'


  namespace :admin do
    resources :calls do
      resources :reports, on: :collection, only: [:index, :show, :destroy]
      post :recount, on: :member
    end
    resources :users do
      post :accept, on: :member
    end
    resources :criterions do
      post :change_relative_weight_value, on: :member
    end
  end

  resources :users do
    resources :calls, only: [:index, :show]
  end

  resources :criterions, only: [:index, :show]

end
