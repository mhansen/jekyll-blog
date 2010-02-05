default:
	cmd /C jekyll


server:
	cmd /C jekyll --server 8000 --auto > /dev/null &
