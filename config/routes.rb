Rails.application.routes.draw do

  devise_for :users

  root to: 'calls#index'

  namespace :admin do
    resources :calls
    resources :users
  end

  resources :users, only: [:show] do
    resources :calls, only: [:index, :show]
  end

end
