Rails.application.routes.draw do

  devise_for :users

  root to: 'start#access'

  namespace :admin do
    resources :calls do
      post :recount, on: :member
    end
    resources :users do
      get :accept, on: :member
    end
    resources :criterions do
      post :change_relative_weight_value, on: :member
    end
  end

  resources :users do
    resources :calls, only: [:index, :show]
  end

end
