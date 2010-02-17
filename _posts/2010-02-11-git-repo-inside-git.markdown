---
title: Git inside Git
layout: post
categories:
- git
---

How do you keep another Git repository inside a folder that's already under
version control with Git? Why would you do this?

- I keep my vim config files under revision control, and I tried cloning other
  people's vim modules from github into subdirectories of my repository.
- I use [underscore.js](http://documentcloud.github.com/underscore/) inside some
  of my javascript projects. Both are kept in git.

If you `git clone`, git will happily comply and clone the repository into your
folder, but you won't be able to add the `.git` folder into revision control.
If you try to `git add subrepository/.git`, your request will be ignored, as if
the .git folder doesn't exist at all:

{% highlight sh %}
git add subrepository/.git
fatal: pathspec 'subrepository.git' did not match any files
{% endhighlight %}

And that's just as well - keeping track of a repository's history inside
another repository would be horribly wasteful. And every time the subrepository
updates, the parent repository will need to update both the working directory
files and the subrepository history files, complicating the diffs. And it's
just not necessary: git has a great way of keeping git repositories inside git.

Submodules
----------

Submodules are a way of importing code from other git repositories into your source tree, and keeping them up to date after they are imported.

{% highlight sh %}
cd my_git_repo_root
git submodule add <remote repository> <local path>
{% endhighlight %}

This will checkout the remote repository into the local path, and records the
remote repository in a `.gitmodules` at the root of your repo.

Then, later on, if a new version of a submodule is released, you can update your
copy with

{% highlight sh %}
git submodule update
{% endhighlight %}

That's the basics. For more info:
- [Submodules in the Git Book](http://book.git-scm.com/5_submodules.html)
- [git-submodule(1) manpage](http://www.kernel.org/pub/software/scm/git/docs/git-submodule.html)
