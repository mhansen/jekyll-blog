desc 'Deploy to app engine'
task :deploy => [:site] do
  sh '~/Downloads/go_appengine/appcfg.py update . --oauth2'
end

desc 'Generate the site'
task :site do
  sh 'jekyll build'
end
