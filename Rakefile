desc 'Generate tags page'
task :tags do
  puts "Generating tags..."
  require 'rubygems'
  require 'jekyll'
  include Jekyll::Filters
  
  options = Jekyll.configuration({})
  site = Jekyll::Site.new(options)
  site.read_posts('')
  sidebar_html = '<ul>'
  site.categories.sort.each do |category, posts|
    sidebar_html << <<-SIDEBAR_HTML
    <li><a href="tags/#{category}.html">#{category} (#{posts.count})</a></li>
    SIDEBAR_HTML

    html = ''
    html << <<-HTML
---
layout: default
title: Postings tagged "#{category}"
---
    <h1 id="#{category}">Postings tagged "#{category}"</h1>
    HTML

    html << '<ul class="posts">'
    posts.each do |post|
      post_data = post.to_liquid
      html << <<-HTML
        <li>
          <span class="date">#{post.date}</span>
          <a href="#{post.url}">#{post_data['title']}</a>
        </li>
      HTML
    end
    html << '</ul>'
    
    File.open("tags/#{category}.html", 'w+') do |file|
      file.puts html
    end
  end
  sidebar_html << '</ul>'
  File.open("_includes/categories.html", 'w+') do |file|
      file.puts sidebar_html
  end
  puts 'Done.'
end
