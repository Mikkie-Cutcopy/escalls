Rails.application.routes.draw do

  devise_for :users

  root to: 'start#access'

  namespace :admin do
    resources :calls
    resources :users
  end

  resources :users do
    resources :calls, only: [:index, :show]
  end

end
