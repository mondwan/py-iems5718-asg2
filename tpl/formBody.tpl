<div class="col-xs-12">
    <h1>Assignment 2</h1>
    <form class="form-horizontal" action="POST">
        <div class="form-group">
            <label for="name" class="col-sm-3 control-label">Name:</label>
            <div class="col-sm-9">
              <input
                id="name"
                class="form-control"
                type="text"
                name="name"
                value="{{ name }}"
                placeholder="Enter your name"
              />
              <span class="help-block"></span>
            </div>
        </div>
        <div class="form-group">
            <label for="gender" class="col-sm-3 control-label">Gender:</label>
            <div class="col-sm-9">
              <div class="radio">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    {{male|yesno:"checked,''"}}
                    >Male
                </label>
              </div>
              <div class="radio">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    {{female|yesno:"checked,''"}}
                    >Female
                </label>
              </div>
              <span class="help-block"></span>
            </div>
        </div>
        <div class="form-group">
              <label for="age" class="col-sm-3 control-label">Age:</label>
              <div class="col-sm-9">
                <input
                  id="age"
                  class="form-control"
                  type="number"
                  name="age"
                  value="{{age}}"
                  min="0"
                  max="99"/>
                <span class="help-block"></span>
              </div>
        </div>
        <div class="form-group">
            <label for="exp" class="col-sm-3 control-label">
              Years of experience in web development:
            </label>
            <div class="col-sm-9">
              <input
                id="exp"
                class="form-control"
                type="number"
                name="exp"
                value="{{exp}}"
                min="0"
                max="99"/>
              <span class="help-block"></span>
            </div>
        </div>
        <div class="form-group">
            <label for="talent" class="col-sm-3 control-label">
              Talent Tree:
            </label>
            <div class="col-sm-9">
                <div class="input-group">
                    <input
                      id="talent"
                      type="text"
                      class="form-control"
                      placeholder="Talent"
                      value={{talent}}
                    >
                    <span class="input-group-btn">
                        <button
                            id="viewTalent"
                            class="btn btn-primary"
                            type="button"
                        >View Talent</button>
                    </span>
                </div>
                <span class="help-block"></span>
            </div>
        </div>
        <button
          id="save"
          type="submit"
          class="btn btn-primary col-xs-12"
        >Save</button>
    </form>
</div>
