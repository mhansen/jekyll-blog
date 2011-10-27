desc 'Generate bits of the site that cant be done with Liquid'
task :site do 
  require 'rubygems'
  require 'jekyll'
  include Jekyll::Filters
  
  options = Jekyll.configuration({})
  site = Jekyll::Site.new(options)
  site.read_posts('')
  puts "Generating tags..."
  FileUtils.rm_r "tags" if File.exist? "tags"
  FileUtils.mkdir "tags"
  site.categories.sort.each do |category, posts|
  
    html = ''
    html << <<-HTML
---
layout: default
title: Postings tagged "#{category}"
---
    <h2 class="title">#{category}</h2>
    <hr class="half-bottom">
    <div class="subtitle">Posts tagged #{category}</div>
    <hr>
HTML
  
    html << '<ul class="posts">'
    posts.each do |post|
      post_data = post.to_liquid
      html << <<-HTML
        <li>
          <span class="date">
            #{post.date.strftime(site.config['date_format'])}
          </span>
          <a href="#{post.url}">#{post_data['title']}</a>
        </li>
        HTML
    end
    html << '</ul>'
  
    FileUtils.mkdir "tags/#{category}/"
    File.open("tags/#{category}/index.html", 'w+') do |file|
      file.puts html
    end
  end
  puts 'Done.'
  
  puts 'Generating tag cloud...'
  html = ''
  site.categories.sort.each do |category, posts|
      font_size = 12 + (posts.count*1.5);
      html << <<-HTML
      <a href="/tags/#{CGI::escape(category).gsub('+', '%20')}" style="font-size:#{font_size}px;">
        #{category}
      </a>
      HTML
  end
  File.open('_includes/tagcloud.html', 'w+') do |file|
    file.puts html
  end
  puts 'Done.'
  puts 'Checking posts...'
  site.posts.each do |post|
    unless post.data.has_key? 'description'
      puts post.data['title']+": no meta description."
    end
  end
  puts 'Done.'
end
