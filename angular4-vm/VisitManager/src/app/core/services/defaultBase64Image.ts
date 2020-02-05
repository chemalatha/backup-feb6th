import { Injectable } from '@angular/core';

@Injectable()
export class DefaultBase64Image {

    public defaultSpeakerAvatarImage = "iVBORw0KGgoAAAANSUhEUgAAANYAAADWCAYAAACt43wuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NkZFMzk4MDM0MzFDMTFFNTg4Rjk5MEI0QzIwMDU4QUUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NkZFMzk4MDQ0MzFDMTFFNTg4Rjk5MEI0QzIwMDU4QUUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2RkUzOTgwMTQzMUMxMUU1ODhGOTkwQjRDMjAwNThBRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2RkUzOTgwMjQzMUMxMUU1ODhGOTkwQjRDMjAwNThBRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgQVBCwAAAtNSURBVHja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";

    public defaultVisitThemeImage = "iVBORw0KGgoAAAANSUhEUgAAAIMAAACOCAYAAAASA7u4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4JpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozODIyMUY1MDI3MjE2ODExODIyQUIwNDFGNkJFOTE0QiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBNkIyNTgxRDBDRTIxMUU1ODdBOEMyQkQ3QzE0MDIyQyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBNkIyNTgxQzBDRTIxMUU1ODdBOEMyQkQ3QzE0MDIyQyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNCAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmUyYzY2NzQxLTYzMzItNDNiMi05MTU5LTJlNjdkNjYyYjU3MCIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmRiM2EyYWUwLTU1NDMtMTE3OC1hYjM5LWI1NWY3YjBkNzNmMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Po23yGQAAAPzSURBVHja7N1bTiNHFIDhxpibuBkhwViah1GSJeQ1D9lFVjBbSHaQbCHSLCcLYAN5LgkhA+Z+j4+ikYK7HPDYhnb390strKIo5O5fdevTpxcODg6KN+b3wfFbUQ/+Ghw/1eS7FK0CIAPIADKADCADyAAygAyYMu3/+2W32536P0wp1eoEzuIcvdc5b1e622q1iu3t7VL5zc1NcXl5WSrf3Nws2u3nX+np6ak4OTkp1V1eXi7W19dL5RcXF8Xt7a2eoWosLCwUq6urpfLHx8ds/bjAcQzLkGNxcTHb9vX1tTkDQAaQAWQAGUAG1GdpGTw8PLx6aRnlw/VH1Y0lZ67tUUtRMlRAhMPDw1fXPz4+fnXd2E9o8p6CYQLzPUw0lZTSp8GPH8iA4Jfi38cKDBMwZwAZQAaQAWQAGTAvVD4GstPplMojBjJiFSchwuM2NjZK5efn52Igq0jEQK6srJTKczeYxiViIHNtX11dGSYA29E1IHrQvb29bC/X7/fJ0LguvtXKSjJuz/Dn4PhvIMDXz08ppa9Pn0SEyGnmcwze/czn+2in2+2euUzzNUx8nlHbtUp+ZQIJE8iqEPGIsacwzP39/cRtx/I01/Y0lq1kmAERzNrr9WbSdmwszaptwwT0DKgGuRQF426rk6EGxNzq9PTUMIE3HCbi7l7uhk50S02eeTdWhtyt3liWkcFqAmQAGUAGmEBWighN293dLZVH0MbZWfnu+M7OTrG0tPSsLLa0j46O3u07pJS+DH78/A1/2iFDRohSd9bKd2hRPlx/VN035MPg+K4WPUPsbuWynzQ5w0klx/uM9HGNxrlOL8oQIemThqVjtkR42/7+fqk8NgbH2aY2gQQZQAaQAXO/tIyZcC49393dXbZ+BHMMr3ysemoiQ1zYcXI75jaiYJjALHoGwS3zQa5XHDWcTiSD4JZqE/OiyCthmIA5A8gAMoAMIAPIgHfmxX2GWL9OYw1bNdbW1rI5JuO92U1N/6dnABlABpABZAAZQAZMSGNzOkUuydz+yZg5Jj+mlH59oc73ZKg4EQU0biRQhk+D4w/DBMwZQAaQAWQAGUAGgAwgA0Ywyx3I1ZRSLstZx2lvngw/Do6/nWLDBMgAMoAMIAPIADKADCADyABUPDo6XqiRe2w+0g7m3oGxtbVVtNvPv1KkxRsnyywZKkq8VCOXkHRU/sl4P1XkrRyWAYYJkAFkABlABpABjV1axrIw9hSGGfXYfDxVPbyUtLSsiQzxWqJer/fq+v1+3xU1TIAMIAPIADKADCADyAAygAwgA8gAMoAMIAPIADKADCADyAAygAwgg1MAMoAMIAPIADKADCADpsQ/AgwAbGddSJjGXd0AAAAASUVORK5CYII=";

}
