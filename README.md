# 🎬 YouTube Metadata Extractor (Python/Flask)

 ![YouTube Extractor Thumbnail](YT%20Extractor.png)

👉 **LIVE DEMO:** [Link will go here after Render Deployment] 👈

This project implements a secure, full-stack utility to reliably extract metadata from any public YouTube video URL using **Python/Flask** and the **Google YouTube Data API v3**. It serves as a strong demonstration of API integration, server-side data fetching, and secure key management.

## 🔑 Key Features

* **Security First:** The application uses a **Flask backend** and **Environment Variables** (for platforms like Render) to securely handle the Google API Key, preventing exposure in the public frontend.
* **Robust Data Extraction:** Retrieves essential video details including Title, Description, Duration (formatted to HH:MM:SS), Publication Date, and Thumbnail URL.
* **Full-Stack Implementation:** Built with a clean Python backend and a responsive front-end using HTML/CSS/JavaScript.
* **Modular Design:** Easy to extend for advanced features like automated reporting or database storage.

## 💻 Technologies Used

* **Python** (Backend Logic)
* **Flask** (Micro Web Framework)
* **Google API Client** (`google-api-python-client`)
* **HTML/CSS/JavaScript** (Responsive Interface)

## Setup Instructions

Follow these steps to set up the project locally:

1.  **Create Project Structure:**
    * Create the main project folder (e.g., `youtube_extractor`).
    * Create a subfolder named `templates` for the `index.html` file.

2.  **Create a virtual environment:**
    ```bash
    python3 -m venv venv
    ```

3.  **Activate the virtual environment:**
    * **On macOS and Linux:**
        ```bash
        source venv/bin/activate
        ```
    * **On Windows:**
        ```bash
        .\venv\Scripts\activate
        ```

4.  **Install dependencies:**
    *(Ensure your `requirements.txt` contains: `Flask`, `gunicorn`, `google-api-python-client`, `isodate`)*
    ```bash
    pip install -r requirements.txt
    ```

5.  **Configure API Key (Local Testing):** See the **API Key Integration** section below for instructions on securely setting the `YOUTUBE_API_KEY` environment variable on your local machine.

## Running the Application

Once the dependencies are installed and the API key is set, run the application using Flask:

```bash
flask run


## Contributing

We welcome contributions to this project!  If you'd like to contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive commit messages.
4.  Test your changes thoroughly.
5.  Submit a pull request to the main branch.

Please ensure your code adheres to the project's coding style and includes appropriate tests.

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute this code. - see the [LICENSE](LICENSE) file for details.
