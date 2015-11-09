role :app, %w(hosting_escalls@calcium.locum.ru)
role :web, %w(hosting_escalls@calcium.locum.ru)
role :db, %w(hosting_escalls@calcium.locum.ru)

set :ssh_options, forward_agent: true
set :rails_env, :production
