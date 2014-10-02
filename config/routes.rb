Rails.application.routes.draw do

  devise_for :users

  namespace :admin do
    resources :calls
    resources :users
  end

  resources :users, only: [:show] do
    resources :calls, only: [:index, :show]
  end

end
