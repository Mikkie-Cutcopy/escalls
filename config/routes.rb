Rails.application.routes.draw do

  devise_for :users

  root to: 'start#access'

  namespace :admin do
    resources :calls
    resources :users do
      get :accept, as: :member
    end
    resources :criterions do
      post :change_rw_value, on: :member
    end
  end

  resources :users do
    resources :calls, only: [:index, :show]
  end


end
