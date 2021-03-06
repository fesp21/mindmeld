Meteor.userFunctions = {
  logFormEdit: function(event, path) {
    var formEditAttributes = {
      element: event.target.id,
      value: event.target.value,
      teamId: this.teamId,
      path: path
    };
    Meteor.call('logFormEdit', formEditAttributes);
  },
  logFormEditWithParams: function(element, value, teamId, path) {
    var formEditAttributes = {
      element: element,
      value: value,
      teamId: teamId,
      path: path
    };
    Meteor.call('logFormEdit', formEditAttributes);
  },
  teamParams: function() {
    return {
      teamCode: this.code || ""
    }
  },
  projectParams: function() {
    var team = Teams.findOne(this.teamId);
    return {
      teamCode: team && team.code || "",
      projectCode: this.code || ""
    };
  },
  featureParams: function() {
    var team = Teams.findOne(this.teamId);
    var project = Projects.findOne(this.projectId);
    return {
      teamCode: team && team.code || "",
      projectCode: project && project.code || "",
      featureCode: this.code || ""
    };
  },
  issueParams: function() {
    var team = Teams.findOne(this.teamId);
    var project = Projects.findOne(this.projectId);
    var feature = Features.findOne(this.featureId);
    return {
      teamCode: team && team.code || "",
      projectCode: project && project.code || "",
      featureCode: feature && feature.code || "",
      issueCode: this.code || ""
    }
  },
  tagParams: function() {
    var team = Teams.findOne(this.teamId);
    return {
      teamCode: team && team.code || "",
      tag: this.tag || ""
    }
  },
  usernameParams: function() {
    return {
      username: this.username || ""
    }
  },
  addError: function(reason) {
    $('#error-notification').append('<div class="alert alert-error"><button type="button" class="close" data-dismiss="alert">&times;</button>' + reason + '</div>');
  },
  teamCode: function() {
    return this.teamId && Teams.findOne(this.teamId) && 
    Teams.findOne(this.teamId).code;
  },
  joinedTeamName: function() {
    return this && Teams.findOne(this.toString()) && Teams.findOne(this.toString()).name;
  },
  teamName: function() {
  	return this.teamId && Teams.findOne(this.teamId) &&
    Teams.findOne(this.teamId).name;
   },
  projectCode: function() {
    return this.projectId && Projects.findOne(this.projectId) &&
    Projects.findOne(this.projectId).code;
  },
  projectName: function() {
    return this.projectId && Projects.findOne(this.projectId) &&
    Projects.findOne(this.projectId).name;
  },
  featureCode: function() {
    return this.featureId && Features.findOne(this.featureId) &&
    Features.findOne(this.featureId).code;
  },
  featureName: function() {
    return this.featureId && Features.findOne(this.featureId) &&
    Features.findOne(this.featureId).name;
  },
  issueCode: function() {
    return this.issueId && Issues.findOne(this.issueId) && Issues.findOne(this.issueId) &&
    Issues.findOne(this.issueId).code;    
  },
  issueName: function() {
    return this.issueId && Issues.findOne(this.issueId) && 
    Issues.findOne(this.issueId).name;
  },
  issueDueDate: function() {
    return this.featureId && Features.findOne(this.featureId) &&
    Features.findOne(this.featureId).dueDate;
  },
  issueComments: function() {
    return Comments.find({issueId: this._id, teamId: this.teamId},{sort: {createdAt: -1}});
  },
  statusKey: function() {
    return Meteor.Mindmeld.toStatusEnum(this.status) && Meteor.Mindmeld.toStatusEnum(this.status).key;
  },
  statusNotStarted: function() {
    return Meteor.Mindmeld.toStatusEnum(this.status) && Meteor.Mindmeld.toStatusEnum(this.status).key === "notStarted";
  },
  statusInProgress: function() {
    return Meteor.Mindmeld.toStatusEnum(this.status) && Meteor.Mindmeld.toStatusEnum(this.status).key === "inProgress";
  },
  statusCompleted: function() {
    return Meteor.Mindmeld.toStatusEnum(this.status) && Meteor.Mindmeld.toStatusEnum(this.status).key === "completed";
  },
  statusCancelled: function() {
    return Meteor.Mindmeld.toStatusEnum(this.status) && Meteor.Mindmeld.toStatusEnum(this.status).key === "cancelled";
  },
  statusDisplay: function() {
    return Meteor.Mindmeld.toStatusEnum(this.status) && Meteor.Mindmeld.toStatusEnum(this.status).display;
  },
  truncatedDetail: function() {    
    return this.detail && this.detail.length > 160 ? this.detail.substring(0, 160) + "..." : this.detail;
  },
  createdByUsername: function() {
    return this.createdByUsername || (this.createdByUserId && Meteor.users.findOne(this.createdByUserId) && 
    Meteor.users.findOne(this.createdByUserId).username);
  },
  ownedByUsername: function() {
    return this.ownedByUserId && Meteor.users.findOne(this.ownedByUserId) &&
    Meteor.users.findOne(this.ownedByUserId).username;
  },
  isCurrentUser: function() {
    return this.username == Meteor.user().username;
  },
  ownedByCurrentUser: function() {
    return this && this.ownedByUserId && this.ownedByUserId === Meteor.userId();
  },
  following: function() {
    return SessionAmplify.get('following');
  },
  followingUsername: function() {
    var user = Meteor.users.findOne(SessionAmplify.get('following'));
    return user ? user.username : 'Nobody';
  },
  momentTimeAgoCreatedAt: function() {
    return this.createdAt && moment(this.createdAt) && 
    moment(this.createdAt).fromNow();
  },
  momentStatusChanged: function() {
    return this.statusChanged && moment(this.statusChanged) && 
    moment(this.statusChanged).fromNow();
  },
  tagsAsCommaSeperatedString: function() {
    return this.tags && this.tags.join(",");
  },
  iconTags: function() {
    if (this.tags) {
      var teamCode = this.teamId && Teams.findOne(this.teamId) && Teams.findOne(this.teamId).code;
      return _.map(this.tags, function(tag) { return '<a href="' + 
        Router.path('tag', {teamCode: teamCode, tag: tag})
        + '"><span class="label"><i class="icon-tag"></i> ' + tag + '</span></a>'; }).join(' ');
    }
  },
  currentUserOwnsComment: function() {
    return this.createdByUserId && this.createdByUserId == Meteor.userId();
  },
  teamsCreatedByUserCount: function() {
    return Teams.find({createdByUserId: Meteor.userId()}).count();
  },
  projectsInTeamCount: function() {
    return Projects.find({teamId: this._id}).count();
  },
  projectsInTeamCountIsThreeOrGreater: function() {
    return Projects.find({teamId: this._id}).count() >= 3;
  },
  teamInvite: function() {
    return TeamInvites.findOne(Session.get('teamInviteId'));
  },
  userIsTeamOwner: function() {
    var currentTeam = Teams.findOne({code: Router.current().params.teamCode});
    return this._id && currentTeam && currentTeam.owner && this._id == currentTeam.owner;
  }
};