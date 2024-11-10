from flask import Flask, request, jsonify, render_template
import json
import time

app = Flask(__name__)

# Route for hello world
@app.route('/hello')
def hello_world():
    return "Hello, World!"

# Route to change the color and save it to color.json
@app.route('/change/color', methods=['POST'])
def change_color():
    if request.method == 'POST':
        data = request.get_json()
        r = data.get('R', 0)
        g = data.get('G', 0)
        b = data.get('B', 0)
        
        # Store the color in color.json
        color_data = {'R': r, 'G': g, 'B': b}
        with open('static/config/color.json', 'w') as json_file:
            json.dump(color_data, json_file)
        print("Change RGB to: " + str(color_data))

        return jsonify({'message': 'Color changed successfully', 'color': color_data})
        
# Route for serving the static webpage
@app.route('/change/color', methods=['GET'])
def change_color_page():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
