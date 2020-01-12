import os
import pickle
import xml.dom.minidom

from flask import Flask, render_template, request

TALKS_XML = 'mp4-master.xml'
VOTES_PICKLE = 'votes.pickle'

app = Flask('talkvote')
votes = {}

if os.path.exists(VOTES_PICKLE):
	with open(VOTES_PICKLE, 'rb') as f:
		votes = pickle.load(f)

@app.route('/vote')
@app.route('/')
def index():
	dom = xml.dom.minidom.parse(TALKS_XML)
	talks = []

	video_id = request.args.get('id', None)
	video_vote = request.args.get('vote', None)

	if request.path == '/vote' and video_id and video_vote:
		if video_id in votes:
			if video_vote == 'up':
				votes[video_id] += 1
			elif video_vote == 'down':
				votes[video_id] -= 1
		else:
			if video_vote == 'up':
				votes[video_id] = 1
			elif video_vote == 'down':
				votes[video_id] = -1

		with open(VOTES_PICKLE, 'wb') as f:
			pickle.dump(votes, f)

	for item in dom.getElementsByTagName('item'):
		talk = {}
		talk['title'] = item.getElementsByTagName('title')[0].firstChild.data.rstrip(' (36c3)')
		talk['speakers'] = item.getElementsByTagName('itunes:author')[0].firstChild.data if item.getElementsByTagName('itunes:author') else  ''
		talk['summary'] = item.getElementsByTagName('itunes:summary')[0].firstChild.data if item.getElementsByTagName('itunes:summary') else ''
		talk['duration'] = item.getElementsByTagName('itunes:duration')[0].firstChild.data if item.getElementsByTagName('itunes:duration') else ''
		talk['video_link'] = item.getElementsByTagName('link')[0].firstChild.data
		talk['id'] = item.getElementsByTagName('dc:identifier')[0].firstChild.data
		talk['votes'] = votes[talk['id']] if talk['id'] in votes else 0
		talks.append(talk)

	return render_template('index.html', talks=talks, votes=votes)
