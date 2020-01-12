# Talk Vote

Voting for recordings of 36C3 talks. Used for post congress talk watching at the [backspace](https://hackerspace-bamberg.de).

## Requirements

- Python 3
	- Flask

## Installation

Preferably in virtualenv (`virtualenv env`):

1. Install dependencies (`pip install -r requirements.txt`)
2. Make sure the directory is writeable (to allow creating of `votes.pickle` file)

Optional: Update `mp4-master.xml` from [media.ccc.de](https://media.ccc.de/c/36c3/podcast/mp4-master.xml).

## Usage

### Development

1. `source env/bin/activate`
2. `FLASK_APP=36c3talks FLASK_DEBUG=1 flask run`

### Production

Use uwsgi + FastCGI.
