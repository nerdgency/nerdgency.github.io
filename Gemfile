source "https://rubygems.org"

gem "jekyll", "~> 4.3"
gem "just-the-docs", "~> 0.8"

group :jekyll_plugins do
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# http_parser.rb has been broken for a long time, but a fixed version is available
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]

gem "webrick", "~> 1.8"
