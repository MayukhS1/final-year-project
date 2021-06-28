import flask

app = flask.Flask(__name__)
app.config["DEBUG"] = True

import pickle, surprise
from surprise import Reader
from surprise import Dataset
import numpy as np
#from flask import Flask, request, jsonify, render_template
import os
import io


# file_path=os.path.expanduser('~/DESKTOP/jyoti/Recommendation-System/dataset/ml-100k/u.data')
model = pickle.load(open('recommended_model.sav','rb'))
file_path=os.path.expanduser(R'u.data')

reader = Reader(line_format='user item rating timestamp', sep='\t')
data = Dataset.load_from_file(file_path, reader)
trainset = data.build_full_trainset()
# model = pickle.load(open('model.pkl', 'rb'))

# show topN similar movies as given movie_name
def showSimilarMovies(alg, rid_to_name, name_to_rid, movie_name, topN):
    # get movie raw_id
    movie_raw_id = name_to_rid[movie_name]
    # convert raw_id to inner_id
    movie_inner_id = alg.trainset.to_inner_iid(movie_raw_id)
    # get topN similar movies
    neighbor_movie_ids = alg.get_neighbors(movie_inner_id, topN)
    neighbors_raw_ids = [alg.trainset.to_raw_iid(inner_id) for inner_id in neighbor_movie_ids]
    neighbors_movies = [rid_to_name[raw_id] for raw_id in neighbors_raw_ids]
    print("The " + str(topN)  + " nearest neighbors of " + movie_name + " are: ")
    print()
    l=[]
    for movie in neighbors_movies:
        print(movie)
        l.append(movie)
    returning_dict={}
    for i in range(len(l)):
        returning_dict[i]=l[i]
    return returning_dict 

# movie id and name mapping
def read_item_names():
    #dirname = os.path.dirname("__file__")
    #filename = os.path.join(dirname, 'dataset/ml-100k/u.item')
    filename=os.path.expanduser(R'u.item')
    rid_to_name = {}
    name_to_rid = {}
    with io.open(filename, 'r', encoding='ISO-8859-1') as f:
        for line in f:
            line = line.split('|')
            rid_to_name[line[0]] = line[1]
            name_to_rid[line[1]] = line[0]
    return rid_to_name, name_to_rid 


@app.route('/api/', methods=['GET'])
def home():
    movie_name=flask.request.args.get('name')
    no_of_recommendations=int(flask.request.args.get('nor'))
    rid_to_name, name_to_rid = read_item_names()
    print(name_to_rid)
    output = showSimilarMovies(model, rid_to_name, name_to_rid, movie_name, no_of_recommendations)
    return output

@app.route('/api/get_names', methods=['GET'])
def names():
    search_params=flask.request.args.get('short_name')
    param_length = len(search_params)
    movie_name_hints = []
    with open('moviename_list.txt', 'r') as filehandle:
        for line in filehandle:
            # remove linebreak which is the last character of the string
            movie = line[:-1]
            # add item to the list
            movie_name_hints.append(movie)
    d_count=0
    returning_dict = {}
    for mnh in movie_name_hints:
        if mnh[:param_length].upper()==search_params.upper():
            returning_dict[d_count]=mnh
            d_count+=1
        if d_count==10:
            break
    return returning_dict


app.run(host='127.0.0.1', port=8000)